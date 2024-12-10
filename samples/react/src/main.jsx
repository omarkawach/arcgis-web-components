import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MDXContent from './main.mdx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MDXContent></MDXContent>
  </StrictMode>,
)
