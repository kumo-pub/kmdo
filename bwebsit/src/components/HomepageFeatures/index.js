import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '一键极速安装',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        支持交互式安装与本地索引部署，自动适配 Linux/macOS 系统架构，秒级完成部署，无需复杂配置。
      </>
    ),
  },
  {
    title: '多语言全链路打通',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
         支持 C++/Go/Rust/Python 多语言发布，集成开发依赖管理，从编码到部署一工具贯穿。
      </>
    ),
  },
  {
    title: '工具即平台',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        以单二进制形态实现“工具即平台”，无额外依赖、隔离式部署不污染系统，支持离线安装与版本自由切换。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
