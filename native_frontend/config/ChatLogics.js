export const getSender = (loggedUser, users) => {
    let wahl = users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    console.log(loggedUser);
    console.log(wahl);
    return wahl
}