// jquery style success callback
export interface IXhrSuccess {
  (result?: any, status?: string, xhr?: XMLHttpRequest): void;
}

// jquery style error callback
export interface IXhrError {  
  (xhr?: XMLHttpRequest, textStatus?: string, errorThrown?: string): void;
}

export interface IXhrConfig {
  url: string;
  method: string;
  async: boolean;
  // 추가 값 많을 수 있으나, 지금은 연습일 뿐임.
}

class HttpRequest {
  settings: IXhrConfig = { url: "", method: "GET", async: true };

  constructor(args?: IXhrConfig | string) {
    if (typeof args === "string") {
      this.settings = { ...this.settings, url: args };
    } else {
      this.settings = { ...this.settings, ...args };
    }
  }

  factory = (settings: IXhrConfig) => {
    const prom = new Promise((resolve: IXhrSuccess, reject?: IXhrError) => {
      const req = new XMLHttpRequest();

      req.open(settings.method, settings.url, settings.async);

      if (typeof req.onload !== "undefined") {
        req.onload = () => {
          console.log("onload: [req]" + req);
          if (req.status >= 200 && req.status < 300) {
            resolve(req.response, req.statusText, req);
          } else {
            if (reject) {
              reject(req, req.statusText);
            }
          }
        };
        if (reject) {
          req.onerror = () => {
            console.log("onerror: [req]" + req);
            reject(req, req.statusText);
          };
        }
      } else {
        req.onreadystatechange = () => {
          console.log("onreadystatechange: [req]" + req);
          if (req.readyState == 4) {
            if (req.status == 200) {
              // Success
              resolve(req.response, req.statusText, req);
            } else {
              if (reject) {
                reject(req, req.statusText);
              }
            }
          }
        };
      }
      req.send(null);
    });
    return prom;
  };

  exec(): Promise<IXhrSuccess>;
  exec(settings: IXhrConfig): Promise<IXhrSuccess>;
  exec(url: string, settings?: IXhrConfig): Promise<IXhrSuccess>;
  exec(url?: string | IXhrConfig, settings?: IXhrConfig): Promise<IXhrSuccess> {
    let config: IXhrConfig = { ...this.settings };

    if (settings) {
      config = { ...config, ...settings };
    } else if (url) {
      if ((<IXhrConfig>url).url) {
        config = { ...config, ...(<IXhrConfig>url) };
      } else {
        config = {...config, url:<string>url};
      }
    }

    return this.factory(config);
  }
}

export default HttpRequest;