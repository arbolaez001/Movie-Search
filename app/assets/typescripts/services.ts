interface AjaxOptions {
  url: string;
  dataType: string;
  data: any;
};

namespace Services {
  export class Http {
    static loadAjax(options: AjaxOptions) {
      return $.ajax({
        url: options.url,
        dataType: options.dataType,
        data: options.data,
      });
    };
  };
};