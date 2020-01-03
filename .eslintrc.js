module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": ["eslint:recommended", "standard"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "globals": {
    "Page": true,
    "Component": true,
  },
  "rules": {
    "semi": 2,
    "space-before-function-paren": "off",
    "no-self-compare": "off",
    // 启用的规则及其各自的错误级别。
    "indent": [ // 强制执行一致的缩进（4个空格）
      1,
      2
    ],
    "linebreak-style": [
      0,
      "error",
      "windows"
    ],
    "quotes": [ // 强制一致使用反引号，双引号或单引号（反引号或单引号）
      1,
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    "no-console": "off",
    "camelcase": "off",
    "no-undef": [2], // 禁用未声明的变量
  }
}