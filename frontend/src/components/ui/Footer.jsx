import React from 'react'
import { Utensils } from 'lucide-react'
const Footer = () => {
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
              {['Privacy', 'Terms', 'Support', 'Contact'].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              ))}
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
