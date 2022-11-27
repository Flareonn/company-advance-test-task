interface THead {
  name: string;
  events?: {
    onclick?: Function;
  };
}

interface VTable {
  header: THead[];
  body: any[] | Record<any, any> = [];
}
