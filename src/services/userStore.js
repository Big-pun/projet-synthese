import { defineStore } from 'pinia';
import { getUserByEmail, postNewUser, updateUser, deleteUser } from '@/api/api.js';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', {
    state: () => ({
      user: null,
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
      },

      async updateUser(userId, userData) {
        this.loading = true;
        this.error = null;
        try {
          const response = await updateUser(userId, userData);
          this.user = { ...this.user, ...response.data };
          return response.data;
        } catch (error) {
          this.error = "Impossible de mettre à jour les informations utilisateur.";
          throw error;
        } finally {
          this.loading = false;
        }
      },

      async deleteUser(userId) {
        this.loading = true;
        this.error = null;
        const router = useRouter();

        try {
          // Appel à l'API de suppression
          await deleteUser(userId);
          
          // Si la suppression réussit, nettoyer l'état
          this.user = null;
          localStorage.removeItem('user');
          router.push('/accueil');
          return true;
        } catch (error) {
          // Gestion des erreurs selon le type de réponse
          if (error.response?.status === 500) {
            this.error = "Le serveur a rencontré une erreur. Veuillez réessayer plus tard.";
          } else {
            this.error = error.response?.data?.message || "Erreur lors de la suppression du profil.";
          }
          throw error;
        } finally {
          this.loading = false;
        }
      }
    },
  });