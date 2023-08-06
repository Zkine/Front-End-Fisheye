class DataFactorie {
  constructor(data, type) {
    if (type === "photographers") {
      return new PhotographersModel(data);
    } else if (type === "media") {
      return new MediaModel(data);
    } else {
      throw "Unknown type format";
    }
  }
}
