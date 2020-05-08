const router = require("express").Router();
const passport = require("passport");
const _ = require("lodash");

const { ticketModel } = require("../../Model/TicketHistory.Model");
const { validateUserTicketHistory } = require("../../validation/validation");
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { error } = validateUserTicketHistory(req.body);
    if (error) return res.status(401).json({ validation_error: error.details[0].message });

    try {
      // storing the data in a constant to reuse
      const userData = [
        _.pick(req.body, [
          "theater_name",
          "theater_address",
          "movie_name",
          "time",
          "price",
          "quantity",
          "type",
          "date",
        ]),
      ];
      // check for existing record
      const exisitngHistory = await ticketModel.findOne({
        email: req.body.email,
      });
      //   if record not available, create one
      if (!exisitngHistory) {
        // creating new history record to the user
        const newHistory = new ticketModel({
          email: req.body.email,
          history: [...userData],
        });
        // save to database
        newHistory.save();

        // retuen to client
        return res.json(newHistory);
      }

      // if the recored exisits, then append the record to history array
      const updateHistory = await ticketModel.findOneAndUpdate(
        {
          email: req.body.email,
        },
        { $addToSet: { history: userData } },
        { new: true }
      );

      // save to DB
      updateHistory.save();
      return res.json(updateHistory);
    } catch (error) {
      res.json({ request_error: error.message });
    }
  }
);

module.exports = router;
