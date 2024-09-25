const useCardRotate = () => {
	function recover() {
		const cardSignup: HTMLElement | null = document.getElementById('card-signup')
		const cardRecover: HTMLElement | null = document.getElementById('card-recover')
		document.getElementById('cards-draaideur')?.classList.add('rotate')
		if (cardSignup) cardSignup.style.display = 'none'
		if (cardRecover) {
			cardRecover.style.display = 'flex'
			document.getElementById('recover_email')?.focus()
		}
	}
	function signup() {
		const cardRecover: HTMLElement | null = document.getElementById('card-recover')
		const cardSignup: HTMLElement | null = document.getElementById('card-signup')
		document.getElementById('cards-draaideur')?.classList.add('rotate')
		if (cardRecover) cardRecover.style.display = 'none'
		if (cardSignup) {
			cardSignup.style.display = 'flex'
			document.getElementById('signup_screenname')?.focus()
		}
	}
	function login() {
		document.getElementById('cards-draaideur')?.classList.remove('rotate')
		document.getElementById('login_email')?.focus()
	}
	function see() {
		document.getElementById('cards-draaideur')?.classList.remove('rotate')
		document.getElementById('login_email')?.focus()
	}
	function change() {
		document.getElementById('cards-draaideur')?.classList.add('rotate')
	}

	return { signup, recover, login, see, change }
}
export default useCardRotate
