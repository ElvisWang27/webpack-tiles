module.exports = {
  presets: ['@babel/preset-react'],
  plugins: ['react-hot-loader/babel'],
  env: {
    client: {
      presets: [
        [
          '@babel/preset-env',
          {
            browserslistEnv: 'web', // 读取设置在packageJson中的browserlist配置，里面('Last 4 versions', 'iOS 7')沿用之前的preset，其实转换量挺大的
            modules: false, // 交由webpack处理esm模块
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            absoluteRuntime: false,
            corejs: false, // corejs generator的非global polyfill不需要，在webpack的dll进行了需要的polyfill
            regenerator: true,
            useESModules: true, // 利于treeshake, 需要保证babel转换的cjs模块（eg. @tencent/news-ug-component）不能再进行babel解析，否则cjs混合esm的头部，exports会undefined
            helpers: true, // 对babel转换函数helper进行聚合，例如_classCheck (大概可以节省1M左右gzip前)
          },
        ],
      ],
    },
    server: {
      presets: [
        [
          '@babel/preset-env',
          {
            browserslistEnv: 'node', // 读取设置在packageJson中的browserlist配置
            modules: 'cjs', // 转换服务器端代码时，先转为commonjs语法，这样import()这种就不会拆包了
          },
        ],
      ],
    },
  },
};
