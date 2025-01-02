console.log('Web worker is running')

self.addEventListener('message', (event) => {
	console.log('Received message from main thread:', event.data)
	self.postMessage('pong (Worker response: ' + event.data + ')')
})
