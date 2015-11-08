import React from 'react';
import ReactDOMServer from 'react-dom/server';
import qs from 'qs';


export default function serve(app) {
  class App extends React.Component {
    render() {
      return <div>Server Rendering!!!!!!!</div>;
    }
  }

  app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  });

  app.use(async (ctx, next) => {
    ctx.body = '<script src="/public/main.bundle.js"></script>'+ReactDOMServer.renderToString(<App />);
  });
}
