const getInitials = (name: string) => {
  let nameArray = name.split(' ');
  let initials = '';

  for (let i = 0; i < nameArray.length && i < 2; i++) {
    initials += nameArray[i].charAt(0).toUpperCase();
  }

  return initials;
};

export { getInitials };
