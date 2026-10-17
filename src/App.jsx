import React from 'react'

export default function App() {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        الانتقال إلى المحتوى الرئيسي
      </a>
      <main id="main-content">
        <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
          <h1>مطعم دار الحطب</h1>
          <p>مشويات على الفحم وطواجن فخار أصيلة</p>
        </div>
      </main>
    </div>
  )
}
