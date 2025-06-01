<?php
// ProcessImage.php

// Function to check if the uploaded file is an image
function isImage($file)
{
    $imageInfo = getimagesize($file['tmp_name']);
    return $imageInfo !== false;
}

// Function to convert the image to JPEG format and resize if necessary
function convertToJpeg($file, $userid, $bookid)
{
    // Create an Imagick object
    $imagick = new Imagick($file['tmp_name']);

    // Get the current dimensions
    $width = $imagick->getImageWidth();
    $height = $imagick->getImageHeight();

    // Resize the image if height is greater than 720px
    if ($height > 720) {
        $newHeight = 720;
        $newWidth = ($width / $height) * $newHeight;
        $imagick->resizeImage($newWidth, $newHeight, Imagick::FILTER_LANCZOS, 1);
    }

    // Generate filename
    $directoryPath = 'users/' . $userid . '/covers';
    $filename = $directoryPath . '/' . $bookid . '.jpg';

    // Ensure the uploads directory exists
    if (!is_dir($directoryPath)) {
        mkdir($directoryPath, 0755, true);
    }

    // Save the new image as JPEG
    // OPTIMIZE: AVIF would be better than JPEG, but support issues
    $imagick->setImageFormat('jpeg');
    $imagick->writeImage($filename);

    // Free up memory
    $imagick->clear();
    $imagick->destroy();

    return ['path' => $filename];
}


// Handle the incoming request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image']) && isset($_POST['userid'])) {
    $userid = basename($_POST['userid']); // Sanitize user ID
    if ($userid  == '' || !isset($userid)) {
        echo json_encode(['error' => 'userid is not set.']);
    }
    $bookid = basename($_POST['bookid']);
    if ($bookid == '' || !isset($bookid)) {
        echo json_encode(['error' => 'userid is not set.']);
    }
    if (isImage($_FILES['image'])) {
        $result = convertToJpeg($_FILES['image'], $userid, $bookid);
        echo json_encode($result);
    } else {
        echo json_encode(['error' => 'Uploaded file is not a valid image.']);
    }
} else {
    echo json_encode(['error' => 'Invalid request.']);
}
