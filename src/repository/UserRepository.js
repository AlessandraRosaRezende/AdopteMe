import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";
import GenericRepository from "./GenericRepository.js";

export default class UserRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }

    getUserByEmail = (email) => {
        return this.getBy({ email });
    }
    getUserById = (id) => {
        return this.getBy({ _id: id })
    }

    async getAllWithPets() {
        try {
            const users = await userModel.find().lean(); // Busca os usuários (objetos simples)

            const usersWithPets = await Promise.all(users.map(async (user) => {
                if (user.pets && user.pets.length > 0) {
                    const pets = await petModel.find({ _id: { $in: user.pets } }).lean(); // Busca os pets pelos IDs
                    return { ...user, pets: pets }; // Substitui os IDs pelos objetos pet
                }
                return user; // Se não tiver pets, retorna o usuário como está
            }));

            return usersWithPets;
        } catch (error) {
            console.error("Erro ao buscar usuários com pets:", error);
            throw error;
        }
    }
}