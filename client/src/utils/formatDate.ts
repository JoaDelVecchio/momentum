const formatDate = (dateString: string | null) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };
  if (dateString)
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
};

export default formatDate;
