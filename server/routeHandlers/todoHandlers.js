const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");

const router = express.Router();

const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", async (req, res) => {
    await Todo.find(((err, data) => {
        if(err) {
            res.status(500).json({
                error: "There was server side error!"
            })
        } else {
            res.status(200).json({
                result: data
            })
        }
    }))
});

// GET A TODO BY ID
router.get("/:id", async (req, res) => {
    await Todo.find({_id: req.params.id}, (err, data) => {
        if(err) {
            res.status(500).json({
                error: "There was server side error!"
            })
        } else {
            res.status(200).json({
                result: data
            })
        }
    })
})

//POST A TODO
router.post("/", async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save(err => {
        if(err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        }else {
            res.status(200).json({
                message: "Todo added successfully!"
            })
        }
    })
})

//POST MULTIPLE TODO
router.post("/all", async (req, res) => {
    // console.log(req.body);
    await Todo.insertMany(req.body, (err) => {
        if(err) {
            res.status(500).json({
                error: "There was server side error!"
            });
        } else {
            res.status(200).json({
                message: "Todos were added successfully!"
            })
        }
    })
})

//PUT TODO
// router.put("/:id", async (req, res) => {
//     await Todo.updateOne({_id: req.params.id}, {
//         $set: {
//             status: "active"
//         }
//     }, (err => {
//         if(err) {
//             res.status(500).json({
//                 error: "There was server side error!"
//             });
//         } else {
//             res.status(200).json({
//                 message: "Todo was updated successfully!"
//             })
//         }
//     }))
// })

//PUT A TODO AND GET DATA
router.put("/:id", async (req, res) => {
    const result = await Todo.findByIdAndUpdate({_id: req.params.id}, 
        {
            $set: {
                status: "inactive"
            }
        }, 
        {
            useFindAndModify: false
        },
        (err => {
            if(err) {
                res.status(500).json({
                    error: "There was server side error!"
                });
            } else {
                res.status(200).json({
                    message: "Todo was updated successfully!"
                })
            }
        })
    );
    console.log(result)
})

// DELETE TODO
router.delete("/:id", async (req, res) => {
    await Todo.deleteOne({_id: req.params.id}, (err => {
        if(err) {
            res.status(500).json({
                error: "There was server side error!"
            });
        } else {
            res.status(200).json({
                message: "Todo was deleted successfully!"
            })
        }
    }))
})


module.exports = router;
