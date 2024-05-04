import { ReactNode } from 'react'
import styles from './layout.module.css'
import Header from '../header'
import Footer from '../footer'

interface Props {
    children: ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}