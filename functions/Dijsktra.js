const axios = require("axios");

const { MAP_QUEST_API_KEY } = require("../config/keys");
const dijsktra = (userLocation, theaterList) => {
  // variables to stores data for the dijsktra nodes
  const error = [];
  const user = [`${userLocation}`];
  const theater1 = [
    `${theaterList[0].name}`,
    `${theaterList[0].location.position[0]},${theaterList[0].location.position[1]}`,
  ];
  const theater2 = [
    `${theaterList[1].name}`,
    `${theaterList[1].location.position[0]},${theaterList[1].location.position[1]}`,
  ];
  const theater3 = [
    `${theaterList[2].name}`,
    `${theaterList[2].location.position[0]},${theaterList[2].location.position[1]}`,
  ];
  const theater4 = [
    `${theaterList[3].name}`,
    `${theaterList[3].location.position[0]},${theaterList[3].location.position[1]}`,
  ];
  const theater5 = [
    `${theaterList[4].name}`,
    `${theaterList[4].location.position[0]},${theaterList[4].location.position[1]}`,
  ];
  const theater = [theater1, theater2, theater3, theater4, theater5];

  //   api call loop
  for (let i = 0; i < theaterList.length - 1; i++) {
    //   api call to MAP QUEST to get the distance between each nodes (only for theaters)
    axios
      .get(
        `http://www.mapquestapi.com/directions/v2/route?key=${MAP_QUEST_API_KEY}&from=${
          theater[i][1]
        }&to=${theater[i === 3 ? i + 1 : i + 2][1]}`
      )
      .then((data) => {
        theater[i].push(`${data.data.route.distance}km`);
      })
      .catch((err) => error.push(err));
  }

  //   API call to get the distance between user and first two theaters.
  axios
    .all([
      axios.get(
        `http://www.mapquestapi.com/directions/v2/route?key=${MAP_QUEST_API_KEY}&from=${user[0]}&to=${theater[0][1]}`
      ),
      axios.get(
        `http://www.mapquestapi.com/directions/v2/route?key=${MAP_QUEST_API_KEY}&from=${user[0]}&to=${theater[1][1]}`
      ),
    ])
    .then(
      axios.spread((data1, data2) => {
        user.push(
          `${data1.data.route.distance}`,
          `${data2.data.route.distance}`
        );
      })
    )
    .catch((err) => error.push(err));

  // return if any error occurs
  if (error.length !== 0) return error;

  setTimeout(() => {
    console.log(user);
    console.log(theater);
  }, 2000);
};

module.exports = dijsktra;
