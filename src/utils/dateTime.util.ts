const addDays = (date: string, days: number): string => {
  if (!date) {
    throw new Error("Date cannot be null");
  }
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result.toISOString(); // returns "YYYY-MM-DDTHH:mm:ss.sssZ"
};

const getCurrentDateTimeUTC = (): string => {
  return new Date().toISOString();
};

const convertUTCToLocal = (utcString: string): string => {
  return new Date(utcString).toLocaleString();
};

const convertLocalToUTC = (localString: string): string => {
  if (localString.length === 10) {
    const now = new Date();
    const time = now.toTimeString().slice(0, 8); // "HH:MM:SS"
    localString += `T${time}`;
  }
  return new Date(localString).toISOString();
};


const getLocalDateTime = (date: string, formate: string = "DATE") => {
  if (!date) return "N/A";
  if (formate === "DATE") return new Date(date)?.toLocaleDateString("en-GB");
  if (formate === "DATETIME") return new Date(date)?.toLocaleDateString("en-GB") + " " + new Date(date)?.toLocaleTimeString("en-GB");
}

export { addDays, getCurrentDateTimeUTC, convertUTCToLocal, convertLocalToUTC, getLocalDateTime };
