# This app is created with REAcT, appwrite, threejs, reduxtoolkit, shadCN useRef and lots of love 

//backend theke data astese kina 
if(req.query.search) {
    products.filter(product => product.name.includes )
}


# shadCN
# npm install tailwindcss @tailwindcss/vite
# create jsconfig.json file 
{
  "files": [],
  "references": [
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}


# npm install -D @types/node  
# Edit vite.config.js
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
# npx shadcn@latest init 
# npx shadcn@latest add button

# 12 
npm i @reduxjs/toolkit react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form

three
npm i three @react-three/fiber three react-scripts react-dom react @types/three @react-three/drei
