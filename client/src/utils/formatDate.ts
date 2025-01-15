const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};

export default formatDate;
