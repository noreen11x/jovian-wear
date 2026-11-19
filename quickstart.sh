#!/bin/bash
# Quick Start Script for Jovian Wear Standalone Platform

echo "🎉 Welcome to Jovian Wear Standalone!"
echo "======================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js: $(node -v)"
echo "✅ npm: $(npm -v)"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Installation failed"
    exit 1
fi

echo ""
echo "📝 Creating .env file..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ .env file created. Edit it with your settings."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "======================================="
echo "🚀 NEXT STEPS:"
echo ""
echo "1. SETUP MONGODB (choose one):"
echo "   a) Local: brew install mongodb-community && brew services start mongodb-community"
echo "   b) Cloud: Sign up at https://www.mongodb.com/cloud/atlas"
echo ""
echo "2. EDIT .env FILE:"
echo "   nano .env"
echo "   (Update MONGODB_URI if using Atlas)"
echo ""
echo "3. START BACKEND (Terminal 1):"
echo "   npm run backend:dev"
echo ""
echo "4. START FRONTEND (Terminal 2):"
echo "   npm run frontend"
echo ""
echo "5. LOAD SAMPLE DATA (Terminal 3):"
echo "   npm run seed"
echo ""
echo "6. VISIT YOUR STORE:"
echo "   http://localhost:3000"
echo ""
echo "======================================="
echo "📚 For more info, read:"
echo "   - SETUP_GUIDE.md"
echo "   - README.md"
echo "   - API_REFERENCE.md"
echo ""
echo "Happy coding! 🎊"
