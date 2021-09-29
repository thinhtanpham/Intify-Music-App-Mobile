module.exports= {
    arrayObjMongoose: function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject())
    },

    objMongoose: function (mongoose) {
        console.log(mongoose.toObject())
        return mongoose ? mongoose.toObject() : mongoose
    }
}