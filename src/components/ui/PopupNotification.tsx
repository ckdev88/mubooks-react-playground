import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../App'

function PopupNotification() {
	const { popupNotification, setPopupNotification } = useContext(AppContext)

	const Popper = () => {
		setTimeout(() => setPopupNotification(''), 1250)
		return <>{popupNotification}</>
	}
	// online state checker & notifier
	const [isOnline, setIsOnline] = useState(navigator.onLine)
	useEffect(() => {
		const handleStatusChange = () => setIsOnline(navigator.onLine)
		window.addEventListener('online', handleStatusChange)
		window.addEventListener('offline', handleStatusChange)
		return () => {
			window.removeEventListener('online', handleStatusChange)
			window.removeEventListener('offline', handleStatusChange)
		}
	}, [isOnline])
	// /online state checker & notifier
	return (
		<>
			{!isOnline && <div id="popupNotificationOffline"> Offline. Some things won&lsquo;t work.</div>}
			{popupNotification !== '' && (
				<div id="popupNotification" className={popupNotification ? 'show' : 'hide'}>
					{popupNotification && <Popper />}
				</div>
			)}
		</>
	)
}
export default PopupNotification
