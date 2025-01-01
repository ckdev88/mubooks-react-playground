import { Link } from 'react-router-dom'

export default function AppFooter() {
	// OPTIMIZE location.pathname doesnt cause rerender, which makes code below a bit useless
	return <>{location.pathname.slice(1) !== 'suggestions' && <Link to="/suggestions">Share suggestions</Link>}</>
}
