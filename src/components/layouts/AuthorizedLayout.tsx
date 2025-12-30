import { Outlet } from 'react-router'

export default function AuthorizedLayout() {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}