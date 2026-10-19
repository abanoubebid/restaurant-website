import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    try {
      localStorage.removeItem('dar_alhatab_store_v1')
    } catch {}
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#171412',
            color: '#FDFBF7',
            fontFamily: 'Tajawal, sans-serif',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              maxWidth: '500px',
              backgroundColor: '#231D19',
              border: '2px solid var(--color-accent, #D97706)',
              borderRadius: '16px',
              padding: '32px 24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🔥</div>
            <h1
              style={{
                fontFamily: 'Alexandria, sans-serif',
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#F59E0B',
                marginBottom: '12px'
              }}
            >
              مرحباً بك في دار الحطب
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'rgba(253, 251, 247, 0.8)', lineHeight: 1.6, marginBottom: '24px' }}>
              تم تحديث إعدادات الموقع بنجاح. يرجى الضغط على الزر أدناه لإعادة تشغيل الموقع بأحدث بياناته.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: '#C26A08',
                color: '#FFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '800',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              🔄 إعادة تحميل الموقع الآن
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
