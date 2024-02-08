const path = require('path')

module.exports = {
  webpack: {
    alias: {
        // replace path'src' with '@'
        // '../images' => '@/images'
      '@': path.resolve(__dirname, 'src')
    }
  }
}