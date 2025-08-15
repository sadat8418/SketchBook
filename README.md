REAcT

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