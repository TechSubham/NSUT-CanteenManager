import React from 'react'
import { Utensils } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './button'
const Footer = () => {
  const navigate = useNavigate()
  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`)
    navigate(`${path}`)
  }
  return (
    <div>
      <footer className="bg-emerald-900 text-emerald-100 py-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-2 mb-6 md:mb-0">
        <Utensils size={24} />
        <span className="text-2xl font-bold">CanteenPro</span>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <div>
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
        </div>
        <div>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
        </div>
        <div>
          <a 
          href="#" className="hover:text-white transition-colors">
            Support
          </a>
        </div>
        
          <div onClick={()=>handleNavigation("/contact")} className=" bg-emerald-900 border border-none transition-colors">
            Contact
          </div>
        
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-emerald-800 text-center text-sm opacity-75">
      © 2025 CanteenPro. All rights reserved.
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer
