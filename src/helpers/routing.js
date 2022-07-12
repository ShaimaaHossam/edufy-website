export const buildURLQueryParams = (queryParams) => {
  const urlParams = new URLSearchParams();

  for (const key in queryParams) {
    if (queryParams[key] && typeof queryParams[key] !== "object") {
      urlParams.append(key, queryParams[key]);
    } else if (queryParams[key] instanceof Array && !!queryParams[key].length) {
      urlParams.append(key, queryParams[key].join(","));
    }
  }

  return urlParams.toString();
};

export const isUUIDValid = (uuid) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return uuid.match(uuidRegex);
};

export const isNumericIDValid = (numericID) => numericID.match(/^\d+$/);

export const downloadFile = (dataURL, name) => {
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = name;
  document.body.appendChild(link);

  link.click();
  link.remove();
};
