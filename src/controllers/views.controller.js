import { petsService, usersService } from "../services/index.js";

const homeView = (req, res) => {
  res.render('home', { mensagem: 'Bem-vindo ao Adoptme!' });
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam em 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const allUsersView = async (req, res) => {
  try {
    const usuariosComPets = await usersService.getAllWithPets(); // Use a nova função
    res.render('users', { usuarios: usuariosComPets });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).send("Erro ao carregar a lista de usuários.");
  }
};

const allPetsView = async (req, res) => {
  try {
    const pets = await petsService.getAll().lean();
    pets.forEach(pet => {
      pet.birthDate = formatDate(pet.birthDate);
    });
    res.render('pets', { pets });
  } catch (error) {
    console.error("Erro ao buscar pets:", error);
    res.status(500).send("Erro ao carregar a lista de pets.");
  }
};

export default {
  homeView,
  allUsersView,
  allPetsView
};