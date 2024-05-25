const quotes = [
	{
		quote: 'There is some good in this world, and it’s worth fighting for.',
		author: 'J.R.R. Tolkien',
		book: 'The Two Towers'
	},
	{
		quote: 'It is only with the heart that one can see rightly; what is essential is invisible to the eye.',
		author: 'Antoine de Saint-Exupéry',
		book: 'The Little Prince'
	},
	{
		quote: 'I am no bird; and no net ensnares me: I am a free human being with an independent will, which I now exert to leave you.',
		author: 'Charlotte Brontë',
		book: 'Jane Eyre'
	},
	{
		quote: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
		author: 'Charles Dickens',
		book: 'A Tale of Two Cities'
	},
	{
		quote: 'Beware; for I am fearless, and therefore powerful.',
		author: 'Mary Shelley',
		book: 'Frankenstein'
	},
	{
		quote: 'I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand. It’s when you know you’re licked before you begin but you begin anyway and you see it through no matter what. You rarely win, but sometimes you do.',
		author: 'Harper Lee',
		book: 'To Kill a Mockingbird'
	},
	{
		quote: 'A man, after he has brushed off the dust and chips of his life, will have left only the hard, clean questions: Was it good or was it evil? Have I done well — or ill?',
		author: 'John Steinbeck',
		book: 'East of Eden'
	},
	{
		quote: 'The only way out of the labyrinth of suffering is to forgive.',
		author: 'John Green',
		book: 'Looking for Alaska'
	},
	{
		quote: 'This above all: To thine own self be true, And it must follow, as the night the day, Thou canst not then be false to any man.',
		author: 'William Shakespeare',
		book: 'Hamlet'
	},
	{
		quote: '‘Why did you do all this for me?’ he asked. ‘I don’t deserve it. I’ve never done anything for you.’ ‘You have been my friend,’ replied Charlotte. ‘That in itself is a tremendous thing.’',
		author: 'E.B. White',
		book: 'Charlotte’s Web'
	},
	{
		quote: 'I took a deep breath and listened to the old brag of my heart: I am, I am, I am.',
		author: 'Sylvia Plath',
		book: 'The Bell Jar'
	},
	{
		quote: 'Love is or it ain’t. Thin love ain’t love at all.',
		author: 'Toni Morrison',
		book: 'Beloved'
	},
	{
		quote: 'We accept the love we think we deserve.',
		author: 'Stephen Chbosky',
		book: 'The Perks of Being a Wallflower'
	},
	{
		quote: 'And so we beat on, boats against the current, borne back ceaselessly into the past.',
		author: 'F. Scott Fitzgerald',
		book: 'The Great Gatsby'
	},
	{
		quote: 'Generally, by the time you are Real, most of your hair has been loved off, and your eyes drop out and you get loose in the joints and very shabby. But these things don’t matter at all, because once you are Real you can’t be ugly, except to people who don’t understand.',
		author: 'Margery Williams',
		book: 'Velveteen Rabbit'
	},
	{
		quote: 'Ever’body’s askin’ that. ‘What we comin’ to?’ Seems to me we don’t never come to nothin’. Always on the way.',
		author: 'John Steinbeck',
		book: 'The Grapes of Wrath'
	},
	{
		quote: 'Whatever our souls are made of, his and mine are the same.',
		author: 'Emily Brontë',
		book: 'Wuthering Heights'
	},
	{
		quote: 'There are years that ask questions and years that answer.',
		author: 'Zora Neale Hurston',
		book: 'Their Eyes Were Watching God'
	},
	{
		quote: 'I am not afraid of storms, for I am learning how to sail my ship.',
		author: 'Louisa May Alcott',
		book: 'Little Women'
	},
	{
		quote: 'All happy families are alike; each unhappy family is unhappy in its own way.',
		author: 'Leo Tolstoy',
		book: 'Anna Karenina'
	},
	{
		quote: 'Memories warm you up from the inside. But they also tear you apart.',
		author: 'Haruki Murakami',
		book: 'Kafka on the Shore'
	},
	{
		quote: 'It is nothing to die; it is dreadful not to live.',
		author: 'Victor Hugo',
		book: 'Les Misérables'
	},
	{
		quote: 'Who controls the past controls the future. Who controls the present controls the past.',
		author: 'George Orwell',
		book: 'Nineteen Eighty-Four'
	},
	{
		quote: 'Life is to be lived, not controlled; and humanity is won by continuing to play in face of certain defeat.',
		author: 'Ralph Ellison',
		book: 'Invisible Man'
	},
	{
		quote: 'Last night I dreamt I went to Manderley again.',
		author: 'Daphne du Maurier',
		book: 'Rebecca'
	},
	{
		quote: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
		author: 'Jane Austen',
		book: 'Pride and Prejudice'
	},
	{
		quote: 'Tomorrow I’ll think of some way to get him back. After all, tomorrow is another day.',
		author: 'Margaret Mitchell',
		book: 'Gone with the Wind'
	},
	{
		quote: 'Why, sometimes, I’ve believed as many as six impossible things before breakfast.',
		author: 'Lewis Carroll',
		book: 'Through the Looking-Glass'
	},
	{
		quote: 'Don’t ever tell anybody anything. If you do, you start missing everybody.',
		author: 'J. D. Salinger',
		book: 'The Catcher in the Rye'
	},
	{
		quote: 'It does not do to dwell on dreams and forget to live.',
		author: 'J.K. Rowling',
		book: 'Harry Potter and the Sorcerer’s Stone'
	},
	{
		quote: 'You pierce my soul. I am half agony. Half hope. Tell me not that I am too late, that such precious feelings are gone for ever.',
		author: 'Jane Austen',
		book: 'Persuasion'
	},
	{
		quote: 'So it goes…',
		author: 'Kurt Vonnegut',
		book: 'Slaughterhouse-Five'
	},
	{
		quote: 'I had the epiphany that laughter was light, and light was laughter, and that this was the secret of the universe.',
		author: 'Donna Tartt',
		book: 'The Goldfinch'
	},
	{
		quote: 'There are some things you learn best in calm, and some in storm.',
		author: 'Willa Cather',
		book: 'The Song of the Lark'
	},
	{
		quote: 'When you play the game of thrones you win or you die.',
		author: 'George R. R. Martin',
		book: 'A Game of Thrones'
	},
	{
		quote: 'The world breaks everyone, and afterward, many are strong at the broken places.',
		author: 'Ernest Hemingway',
		book: 'A Farewell to Arms'
	},
	{
		quote: 'From that time on, the world was hers for the reading. She would never be lonely again, never miss the lack of intimate friends. Books became her friends and there was one for every mood.',
		author: 'Betty Smith',
		book: 'A Tree Grows in Brooklyn'
	},
	{
		quote: 'Once upon a time there was a boy who loved a girl, and her laughter was a question he wanted to spend his whole life answering.',
		author: 'Nicole Krauss',
		book: 'The History of Love'
	},
	{
		quote: 'Very few castaways can claim to have survived so long at sea as Mr. Patel, and none in the company of an adult Bengal tiger.',
		author: 'Yann Martel',
		book: 'Life of Pi'
	},
	{
		quote: 'Anyone who ever gave you confidence, you owe them a lot.',
		author: 'Truman Capote',
		book: 'Breakfast at Tiffany’s'
	},
	{
		quote: 'Isn’t it nice to think that tomorrow is a new day with no mistakes in it yet?',
		author: 'L. M. Montgomery',
		book: 'Anne of Green Gables'
	},
	{
		quote: 'You forget what you want to remember, and you remember what you want to forget.',
		author: 'Cormac McCarthy',
		book: 'The Road'
	},
	{
		quote: 'Call me Ishmael.',
		author: 'Herman Melville',
		book: 'Moby Dick'
	},
	{
		quote: 'It was a pleasure to burn.',
		author: 'Ray Bradbury',
		book: 'Fahrenheit 451'
	},
	{
		quote: 'The past is not dead. In fact, it’s not even past.',
		author: 'William Faulkner',
		book: 'Requiem for a Nun'
	},
	{
		quote: 'He has put a knife on the things that held us together and we have fallen apart.',
		author: 'Chinua Achebe',
		book: 'Things Fall Apart'
	},
	{
		quote: '’And now,’ cried Max, ‘let the wild rumpus start!’',
		author: 'Maurice Sendak',
		book: 'Where the Wild Things Are'
	},
	{
		quote: 'Memories, even your most precious ones, fade surprisingly quickly. But I don’t go along with that. The memories I value most, I don’t ever see them fading.',
		author: 'Kazuo Ishiguro',
		book: 'Never Let Me Go'
	},
	{
		quote: 'Nowadays people know the price of everything and the value of nothing.',
		author: 'Oscar Wilde',
		book: 'The Picture of Dorian Grey'
	},
	{
		quote: 'Time is the longest distance between two places.',
		author: 'Tennessee Williams',
		book: 'The Glass Menagerie'
	},
	{
		quote: 'The voice of the sea is seductive, never ceasing, whispering, clamoring, murmuring, inviting the soul to wander in abysses of solitude.',
		author: 'Kate Chopin',
		book: 'The Awakening'
	},
	{
		quote: 'We dream in our waking moments, and walk in our sleep.',
		author: 'Nathaniel Hawthorne',
		book: 'The Scarlet Letter'
	},
	{
		quote: 'The place where you made your stand never mattered. Only that you were there… and still on your feet.',
		author: 'Stephen King',
		book: 'The Stand'
	},
	{
		quote: 'But soft! What light through yonder window breaks? It is the east, and Juliet is the sun.',
		author: 'William Shakespeare',
		book: 'Romeo and Juliet'
	},
	{
		quote: 'My advice is, never do tomorrow what you can do today. Procrastination is the thief of time.',
		author: 'Charles Dickens',
		book: 'David Copperfield'
	},
	{
		quote: 'So many things are possible just as long as you don’t know they’re impossible.',
		author: 'Norton Juster',
		book: 'The Phantom Tollbooth'
	},
	{
		quote: 'I can’t stand it to think my life is going so fast and I’m not really living it.',
		author: 'Ernest Hemingway',
		book: 'The Sun Also Rises'
	},
	{
		quote: 'There is only one page left to write on. I will fill it with words of only one syllable. I love. I have loved. I will love.',
		author: 'Dodie Smith',
		book: 'I Capture the Castle'
	},
	{
		quote: 'It doesn’t matter who you are or what you look like, so long as somebody loves you.',
		author: 'Roald Dahl',
		book: 'The Witches'
	},
	{
		quote: 'The same substance composes us — the tree overhead, the stone beneath us, the bird, the beast, the star — we are all one, all moving to the same end.',
		author: 'P.L. Travers',
		book: 'Mary Poppins'
	},
	{
		quote: 'I wish, as well as everybody else, to be perfectly happy; but, like everybody else, it must be in my own way.',
		author: 'Jane Austen',
		book: 'Sense and Sensibility'
	},
	{
		quote: 'Love is holy because it is like grace – the worthiness of its object is never really what matters.',
		author: 'Marilynne Robinson',
		book: 'Gilead'
	},
	{
		quote: 'Each time you happen to me all over again.',
		author: 'Edith Wharton',
		book: 'The Age of Innocence'
	},
	{
		quote: 'Brave doesn’t mean you’re not scared. It means you go on even though you’re scared.',
		author: 'Angie Thomas',
		book: 'The Hate U Give'
	},
	{
		quote: 'How easy it was to lie to strangers, to create with strangers the versions of our lives we imagined.',
		author: 'Chimamanda Ngozi Adichie',
		book: 'Americanah'
	},
	{
		quote: 'And, when you want something, all the universe conspires in helping you to achieve it.',
		author: 'Paulo Coelho',
		book: 'The Alchemist'
	},
	{
		quote: 'Life, with its rules, its obligations, and its freedoms, is like a sonnet: You’re given the form, but you have to write the sonnet yourself.',
		author: 'Madeleine L’Engle',
		book: 'A Wrinkle in Time'
	},
	{
		quote: 'There is always something left to love.',
		author: 'Gabriel García Márquez',
		book: 'One Hundred Years of Solitude'
	},
	{
		quote: 'The answer to the ultimate question of life, the universe and everything is 42.',
		author: 'Douglas Adams',
		book: 'The Hitchhiker’s Guide to the Galaxy'
	},
	{
		quote: 'All the world’s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.',
		author: ' William Shakespeare',
		book: 'As You Like It'
	},
	{
		quote: 'Stay gold, Ponyboy, stay gold.',
		author: 'S. E. Hinton',
		book: 'The Outsiders'
	},
	{
		quote: 'Sometimes I can hear my bones straining under the weight of all the lives I’m not living.',
		author: 'Jonathan Safran Foer',
		book: 'Extremely Loud and Incredibly Close'
	},
	{
		quote: 'Do I love you? My God, if your love were a grain of sand, mine would be a universe of beaches.',
		author: 'William Goldman',
		book: 'The Princess Bride'
	},
	{
		quote: 'Time moves slowly, but passes quickly.',
		author: 'Alice Walker',
		book: 'The Color Purple'
	},
	{
		quote: 'You don’t know about me without you have read a book by the name of The Adventures of Tom Sawyer, but that ain’t no matter.',
		author: 'Mark Twain',
		book: 'The Adventures of Huckleberry Finn'
	},
	{
		quote: 'Love is the longing for the half of ourselves we have lost.',
		author: 'Milan Kundera',
		book: 'The Unbearable Lightness of Being'
	},
	{
		quote: 'It is our choices, Harry, that show what we truly are, far more than our abilities.',
		author: 'J.K. Rowling',
		book: 'Harry Potter and the Chamber of Secrets'
	},
	{
		quote: 'For you, a thousand times over.',
		author: 'Khaled Hosseini',
		book: 'The Kite Runner'
	},
	{
		quote: 'Then you must teach my daughter this same lesson. How to lose your innocence but not your hope. How to laugh forever.',
		author: 'Amy Tan',
		book: 'The Joy Luck Club'
	},
	{
		quote: 'And may the odds be ever in your favor.',
		author: 'Suzanne Collins',
		book: 'The Hunger Games'
	},
	{
		quote: 'Ralph wept for the end of innocence, the darkness of man’s heart, and the fall through the air of the true, wise friend called Piggy.',
		author: 'William Golding',
		book: 'Lord of the Flies'
	},
	{
		quote: 'All human wisdom is summed up in these two words – ‘Wait and hope.’',
		author: 'Alexandre Dumas',
		book: 'The Count of Monte Cristo'
	},
	{
		quote: 'Oh, the places you’ll go! You’ll be on your way up! You’ll be seeing great sights! You’ll join the high fliers who soar to high heights.',
		author: 'Dr. Seuss',
		book: 'Oh, the Places You’ll Go'
	},
	{
		quote: 'The longer I live, the more uninformed I feel. Only the young have an explanation for everything.',
		author: 'Isabel Allende',
		book: 'City of the Beasts'
	},
	{
		quote: 'Open your eyes and see what you can with them before they close forever.',
		author: 'Anthony Doerr',
		book: 'All the Light We Cannot See'
	},
	{
		quote: 'If you have the guts to be yourself, other people’ll pay your price.',
		author: 'John Updike',
		book: 'Rabbit, Run'
	},
	{
		quote: 'We were the people who were not in the papers. We lived in the blank white spaces at the edges of print. It gave us more freedom. We lived in the gaps between the stories.',
		author: 'Margaret Atwood',
		book: 'The Handmaid’s Tale'
	},
	{
		quote: 'As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into an enormous insect.',
		author: 'Franz Kafka',
		book: 'The Metamorphosis'
	},
	{
		quote: 'What does the brain matter compared with the heart?',
		author: 'Virginia Woolf',
		book: 'Mrs. Dalloway'
	},
	{
		quote: 'We are such stuff as dreams are made on, and our little life is rounded with a sleep.',
		author: 'William Shakespeare',
		book: 'The Tempest'
	},
	{
		quote: 'The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which.',
		author: 'George Orwell',
		book: 'Animal Farm'
	},
	{
		quote: 'Most men and women will grow up to love their servitude and will never dream of revolution.',
		author: 'Aldous Huxley',
		book: 'Brave New World Revisited'
	},
	{
		quote: 'There is no greater agony than bearing an untold story inside you.',
		author: 'Maya Angelou',
		book: 'I Know Why the Caged Bird Sings'
	},
	{
		quote: 'As he read, I fell in love the way you fall asleep: slowly, and then all at once.',
		author: 'John Green',
		book: 'The Fault in Our Stars'
	},
	{
		quote: 'Anything worth dying for is certainly worth living for.',
		author: 'Joseph Heller',
		book: 'Catch-22'
	},
	{
		quote: 'All the world is made of faith, and trust, and pixie dust.',
		author: 'J.M. Barrie',
		book: 'Peter Pan'
	},
	{
		quote: 'Get busy living or get busy dying.',
		author: 'Stephen King',
		book: 'Rita Hayworth and Shawshank Redemption'
	},
	{
		quote: '‘But man is not made for defeat,’ he said. ‘A man can be destroyed but not defeated.’',
		author: 'Ernest Hemingway',
		book: 'The Old Man and the Sea'
	},
	{
		quote: 'All we can know is that we know nothing. And that’s the height of human wisdom.',
		author: 'Leo Tolstoy',
		book: 'War and Peace'
	},
	{
		quote: 'There is nothing like looking, if you want to find something. You certainly usually find something, if you look, but it is not always quite the something you were after.',
		author: 'J.R.R. Tolkien',
		book: 'The Hobbit'
	},
	{
		quote: 'Life offers up these moments of joy despite everything.',
		author: 'Sally Rooney',
		book: 'Normal People'
	},
	{
		quote: 'The world may be mean, but people don’t have to be, not if they refuse.',
		author: 'Colson Whitehead',
		book: 'The Underground Railroad'
	},
	{
		quote: 'We had made a fetish out of our misfortune, fallen in love with it.',
		author: 'Ann Patchett',
		book: 'The Dutch House'
	},
	{
		quote: 'Just like a murderer jumps out of nowhere in an alley, love jumped out in front of us and struck us both at once',
		author: 'Mikhail Bulgakov',
		book: 'The Master and Margarita'
	},
	{
		quote: 'Life changes in the instant. The ordinary instant.',
		author: 'Joan Didion',
		book: 'The Year of Magical Thinking'
	}
]
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

const QuoteCard = () => {
	return (
		<>
			<article className="quote">
				<main>{randomQuote.quote}</main>
				<footer>
					{randomQuote.book}, {randomQuote.author}
				</footer>
			</article>
		</>
	)
}
export default QuoteCard
