import mongoose from "mongoose";

type connectionType = {
    isConnected: number,
}

const connection : connectionType = {
    isConnected: 0,
};

async function connect(){
    if(connection.isConnected === 1){
        console.log("Database already connected");
        return;
    }
    if (mongoose.connections.length > 0){
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected === 1){ 
            console.log("Use previous connection");
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGODB_URL!.toString());
    console.log("Creating new connection");
    connection.isConnected = mongoose.connections[0].readyState;
}

async function disconnect() {
    if(connection.isConnected === 1){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect();
            connection.isConnected = 0;
        } else {
            console.log("Not Conected");
        }
    }
}

function convertDocumentToObject(doc){
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc;
}

const db = {connect , disconnect, convertDocumentToObject};
export default db;