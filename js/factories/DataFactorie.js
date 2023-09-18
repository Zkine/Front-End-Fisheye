// eslint-disable-next-line
class DataFactorie {
  constructor(data, type) {
    if (type === "photographers") {
      // eslint-disable-next-line
      return new PhotographersModel(data);
    } else if (type === "media") {
      // eslint-disable-next-line
      return new MediaModel(data);
    } else {
      throw "Unknown type format";
    }
  }
}
