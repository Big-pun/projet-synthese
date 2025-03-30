import { defineStore } from 'pinia';
import { getUserByEmail, postNewUser, updateUser, deleteUser } from '@/api/api.js';

// Enable localStorage for user data - no logout of the user on refresh
const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export const useUserStore = defineStore('user', {
    state: () => ({
      user: loadUserFromLocalStorage(),
      loading: false,
      error: null,
    }),
    actions: {
      async login(email, password) {
        this.loading = true;
        this.error = null;
        try {
            const response = await getUserByEmail(email);
            const result = response.data;
            if(result.password === password){
                this.user = result;
                this.saveUserToLocalStorage();
            } else {
                this.error = "Mot de passe incorrect.";
            }
        } catch {
            this.error = "Aucun utilisateur trouvé avec cet email.";
        } finally {
            this.loading = false;
        }
      },
  
      async register(userData) {
        this.loading = true;
        this.error = null;

        try {
          const response = await postNewUser(userData);
          const result = response.data;
          this.user = result;
          this.saveUserToLocalStorage();
        } catch(error) {
            if (error.response) {
                this.error = "Une erreur s'est produite, l'adresse courriel est peut-être déjà utilisée.";
                console.log(error.response.data.message);
              } else if (error.request) {
                this.error = "Pas de réponse du serveur.";
                console.log(error.request);
              } else {
                this.error = "Une erreur s'est produite.";
                this.error = error.message;
              }
        } finally {
          this.loading = false; 
        }
      },

      logout() {
        this.user = null;
        this.loading = false;
        this.error = null;
        this.clearUserFromLocalStorage();
      },

      async updateUser(userId, userData) {
        this.loading = true;
        this.error = null;
        try {
          const response = await updateUser(userId, userData);
          this.user = { ...this.user, ...response.data };
          this.saveUserToLocalStorage();
          return response.data;
        } catch (error) {
          this.error = "Impossible de mettre à jour les informations utilisateur.";
          throw error;
        } finally {
          this.loading = false;
        }
      },

      async deleteUser(userId, password) {
        this.loading = true;
        this.error = null;
        
        try {
          // Vérifier d'abord si le mot de passe est correct
          if (this.user && this.user.password !== password) {
            this.error = "Mot de passe incorrect";
            throw new Error("Mot de passe incorrect");
          }
          
          // Continuer avec la suppression
          await deleteUser(userId);
          
          this.user = null;
          this.clearUserFromLocalStorage();
          return true;
        } catch (error) {
          if (error.message === "Mot de passe incorrect") {
            // Erreur déjà définie
          } else if (error.response?.status === 500) {
            this.error = "Le serveur a rencontré une erreur. Veuillez réessayer plus tard.";
          } else {
            this.error = error.response?.data?.message || "Erreur lors de la suppression du profil.";
          }
          throw error;
        } finally {
          this.loading = false;
        }
      },

      async changePassword(passwordData) {
        this.loading = true;
        this.error = null;
        
        try {
          // Vérifier si le mot de passe actuel est correct
          if (this.user.password !== passwordData.currentPassword) {
            this.error = "Le mot de passe actuel est incorrect";
            throw new Error("Mot de passe actuel incorrect");
          }
          
          // Mettre à jour le mot de passe
          const updatedUser = {
            ...this.user,
            password: passwordData.newPassword
          };
          
          // Appeler l'API pour mettre à jour l'utilisateur
          const response = await updateUser(this.user.id, updatedUser);
          
          // Mettre à jour l'utilisateur dans le store
          this.user = response.data;
          this.saveUserToLocalStorage();
          return response.data;
        } catch (error) {
          if (error.message !== "Mot de passe actuel incorrect") {
            this.error = "Erreur lors de la mise à jour du mot de passe";
          }
          throw error;
        } finally {
          this.loading = false;
        }
      },

      saveUserToLocalStorage() {
        localStorage.setItem('user', JSON.stringify(this.user));
      },

      clearUserFromLocalStorage() {
        localStorage.removeItem('user');
      },
    },
  });