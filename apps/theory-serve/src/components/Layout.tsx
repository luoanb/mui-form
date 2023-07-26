import React, { PropsWithChildren } from 'react'
import Header from './Header'
import styles from '@/components/Layout.module.css'

const Layout = (props: PropsWithChildren) => (
  <div>
    <Header />
    <div className={styles.layout}>{props.children}</div>
  </div>
)

export default Layout
