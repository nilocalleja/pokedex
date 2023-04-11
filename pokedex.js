const getDataApi = async () => {
  const link = "https://pokeapi.co/api/v2/pokemon/";
  const arrayPokemon = [];
  for (let i = 1; i <= 150; i++) {
    const response = await fetch(`${link}${i}`);
    const pokeJson = await response.json();
    arrayPokemon.push(pokeJson);
  }

  return arrayPokemon;
};

const mapeo = (pok) => {
  const mapear = pok.map((poke) => ({
    name: poke.name,
    image: poke.sprites.front_default,
    type: poke.types.map((type) => type.type.name).join(", "),
    id: poke.id,
  }));

  return mapear;
};

const pintarPoke = (pok, search) => {
  const pokeList = document.getElementById("poke-list");
  pokeList.innerHTML = "";
  pok
    .filter((poke) => poke.name.toLowerCase().includes(search.toLowerCase())) // Filtra los resultados según el texto ingresado
    .forEach((poke) => {
      const pokeItem = document.createElement("li");
      pokeItem.innerHTML = `
        <div class="poke-info">
          <img src="${poke.image}" alt="${poke.name}">
          <div class="poke-details">
            <h3>${poke.name}</h3>
            <p>Type: ${poke.type}</p>
            <p>Id: ${poke.id}</p>
          </div>
        </div>
      `;
      pokeList.appendChild(pokeItem);
    });
};

const inicializar = async () => {
  const result = await getDataApi();
  const pokMap = mapeo(result);
  pintarPoke(pokMap, ""); 
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (event) => {
    pintarPoke(pokMap, event.target.value);
  });
};


inicializar();
