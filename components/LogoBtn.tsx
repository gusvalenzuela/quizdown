import React from 'react'
import { useRouter } from 'next/router'

const LogoBtn = () => {
  const router = useRouter()

  return (
    <>
      <style jsx>{`
        .sitename {
          color: #444;
          float: left;
          margin: 0;
          font-weight: 700;
          border: none;
          background-color: transparent;
          text-decoration: none;
          display: inline-block;
          border-bottom: 1px solid transparent;
          cursor: pointer;
          transform: scale(1);
          font-size: var(--heading-3);
        }
        .sitename:hover {
          transform: scale(1.084);
          color: #ddd;
          border-bottom: 1px solid #fff;
          transition: ease-out 0.25s;
        }
      `}</style>
      <button
        className="sitename"
        onClick={() => {
          if (router.pathname === '/') return router.reload()
          return router.push('/')
        }}
        type="button"
      >
        QD⁉
      </button>
    </>
  )
}

export default LogoBtn
