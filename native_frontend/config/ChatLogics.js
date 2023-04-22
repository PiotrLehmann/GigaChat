export const getSender = (loggedUser, users) => {
    let wahl = users[0]._id === loggedUser._id ? users[0].name : users[1].name;
    // console.log(loggedUser);
    // console.log(wahl);
    return wahl
}