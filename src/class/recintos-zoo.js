
class RecintosZoo {

    analisaRecintos(tipoAnimal, quantidade) {
        let animal = this.obterAnimal(tipoAnimal);
        if (!animal) {
            return {
                "recintos_viaveis": [],
                "erro": "Animal inválido"
            };
        }
        if (quantidade <= 0) {
            return {
                "recintos_viaveis": [],
                "erro": "Quantidade inválida"
            };
        }

        let resultado = this.alocaAnimal(animal, quantidade); 
        return resultado;
    }

    obterAnimal(tipoAnimal) {
        for (let i = 0; i < animais.length; i++) {
            if (animais[i].especie.toUpperCase() === tipoAnimal.toUpperCase()) {
                return animais[i];
            }
        }
        return null;
    }

    alocaAnimal(animal, quantidade) {
        let recintosDisponiveis = [];
        for (let i = 0; i < recintosExistentes.length; i++) {
            let recinto = recintosExistentes[i];
            let espacoDisponivel = recinto.tamanho_total - this.obterNumeroAnimaisNoRecinto(recinto.animais_existentes);
            let espacoNecessario = animal.tamanho * quantidade;
            let animaisNoRecinto = this.obterAnimaisNoRecinto(recinto.animais_existentes);
            let biomaValido = this.biomaValido(animal, recinto.bioma);
            let carnivoroCompatível = this.carnivoroCompatível(animal, animaisNoRecinto);
            let macacoCompatível = this.macacoCompatível(animal, animaisNoRecinto);
            let hipopotamoCompatível = this.hipopotamoCompatível(animal, animaisNoRecinto, recinto.bioma);

            if (espacoDisponivel >= espacoNecessario && biomaValido && carnivoroCompatível && macacoCompatível && hipopotamoCompatível) {
                let espacoLivre = espacoDisponivel - espacoNecessario;
                recintosDisponiveis.push({
                    "numero": recinto.numero,
                    "espaço_livre": espacoLivre,
                    "tamanho_total": recinto.tamanho_total
                });
            }
        }

        if (recintosDisponiveis.length === 0) {
            return {
                "recintos_viaveis": [],
                "erro": "Não há recinto viável"
            };
        }

        return {
            "recintos_viaveis": recintosDisponiveis.map(recinto => {
                return `Recinto ${recinto.numero} (espaço livre: ${recinto.espaço_livre} total: ${recinto.tamanho_total})`;
            }),
            "erro": ""
        };
    }


    obterNumeroAnimaisNoRecinto(animais_existentes) {
        if (animais_existentes === "vazio") {
            return 0;
        } else {
            let numeroAnimais = parseInt(animais_existentes.split(" ")[0]);
            return numeroAnimais;
        }
    }

    obterAnimaisNoRecinto(animais_existentes) {
        if (animais_existentes === "vazio") {
            return [];
        } else {
            let animais = animais_existentes.split(" ");
            let especies = animais.slice(1).join(" ");
            return especies.split(",");
        }
    }


    biomaValido(animal, biomaRecinto) {
        let biomasAnimal = animal.bioma.split(" ou ");
        for (let i = 0; i < biomasAnimal.length; i++) {
            if (biomasAnimal[i] === biomaRecinto) {
                return true;
            }
        }
        return false;
    }

    carnivoroCompatível(animal, animaisNoRecinto) {
        if (animal.especie === "LEAO" || animal.especie === "LEOPARDO" || animal.especie === "CROCODILO") {
            if (animaisNoRecinto.length === 0 || animaisNoRecinto.includes(animal.especie)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    macacoCompatível(animal, animaisNoRecinto) {
        if (animal.especie === "MACACO" && animaisNoRecinto.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    hipopotamoCompatível(animal, animaisNoRecinto, biomaRecinto) {
        if (animal.especie === "HIPOPOTAMO" && biomaRecinto === "savana e rio") {
            return true;
        } else {
            return false;
        }
    }
}

export { RecintosZoo as RecintosZoo };


const recintosExistentes = [
  {
    "numero": 1,
    "bioma": "savana",
    "tamanho_total": 10,
    "animais_existentes": "3 macacos"
  },
  {
    "numero": 2,
    "bioma": "floresta",
    "tamanho_total": 5,
    "animais_existentes": "vazio"
  },
  {
    "numero": 3,
    "bioma": "savana e rio",
    "tamanho_total": 7,
    "animais_existentes": "1 gazela"
  },
  {
    "numero": 4,
    "bioma": "rio",
    "tamanho_total": 8,
    "animais_existentes": "vazio"
  },
  {
    "numero": 5,
    "bioma": "savana",
    "tamanho_total": 9,
    "animais_existentes": "1 leão"
  }
]

const animais = [
    {
      "especie": "LEAO",
      "tamanho": 3,
      "bioma": "savana"
    },
    {
      "especie": "LEOPARDO",
      "tamanho": 2,
      "bioma": "savana"
    },
    {
      "especie": "CROCODILO",
      "tamanho": 3,
      "bioma": "rio"
    },
    {
      "especie": "MACACO",
      "tamanho": 1,
      "bioma": "savana ou floresta"
    },
    {
      "especie": "GAZELA",
      "tamanho": 2,
      "bioma": "savana"
    },
    {
      "especie": "HIPOPOTAMO",
      "tamanho": 4,
      "bioma": "savana ou rio"
    }
  ]
