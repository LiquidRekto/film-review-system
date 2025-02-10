import { Http } from "@/services/http.service";

export class BaseService {
  static request(status = { auth: false }, contentType?: string) {
    return new Http(status, contentType!).init();
  }
}
