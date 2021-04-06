<template>
  <li class="character-card-wrapper j-characters-listing__item">
      <div class="character-card status-active">
          <div class="character-card-header">
              <div class="character-card-header-cover-image character-card-header-cover-image-user-backdrop"
              style="background-image: url(&quot;https://www.dndbeyond.com/avatars/61/525/636453154645689772.jpeg&quot;);"></div>
              <div class="character-card-header-upper">
                <a @click="view()" class="character-card-header-upper-details-link" tabindex="-1" aria-hidden="true" style="cursor: pointer;"></a>
                  <div class="character-card-header-upper-portrait">
                      <div class="image user-selected-avatar" style="background-image: url(&quot;https://www.dndbeyond.com/content/skins/waterdeep/images/characters/default-avatar-builder.png&quot;);"></div>
                  </div>
                  <div class="character-card-header-upper-character-info">
                    <div class="character-card-header-upper-character-info-primary">{{char.name}}</div>
                    <div class="character-card-header-upper-character-info-secondary">HG {{char.hg ? char.hg : '?'}} | {{char.race}} | {{char._id}}</div>
                  </div>
              </div>
          </div>
          <div class="character-card-footer">
              <div class="character-card-footer-links">
                <a @click="view()" class="character-card-footer-links-item" style="cursor: pointer;">View</a>
                <a @click="edit()" class="character-card-footer-links-item" style="cursor: pointer;">Edit</a>
                <a @click="remove()" class="character-card-footer-links-item" style="cursor: pointer;">Delete</a>
              </div>
          </div>
      </div>
  </li>

</template>

<script>
export default {
  props: ["char"],
  data() {
    return {
    } 
  },
  methods: {
    view() {
      console.log("view", this.char)
      this.$router.push({path: '/viewer', query: { "characterId": this.char._id }});
    },
    edit() {
      console.log("edit")
      this.$router.push({path: '/creator', query: { "characterId": this.char._id }});
    },
    async remove() {
      console.log("remove")
      await this.$axios.delete(this.$store.state.backendUrl + '/api/characters/' + this.char._id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.userInfo.accessToken
        }
      }).then(resp => {
        console.log("Char deleted!", resp)
        this.$emit('reloadCallback')
      });
    }
  }
}
</script>

<style>
.character-card-wrapper {
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
}

.character-card {
    border-left: 1px solid rgb(209, 205, 202);
    border-right: 1px solid rgb(209, 205, 202);
    border-top: 1px solid rgb(209, 205, 202);
    background: rgb(255, 255, 255);
    position: relative;
}

.character-card::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -1px;
    left: -1px;
    right: -1px;
    height: 12px;
    background-image: url("https://media.dndbeyond.com/app-portal/ddb-character-listing-client/ddb-borders-med.afa8515d.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.character-card {
    position: relative;
}

.character-card-header {
    position: relative;
    padding: 30px 20px;
}

.character-card-header-cover-image {
    position: absolute;
    inset: 0px;
}

.character-card-header-cover-image-user-backdrop {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}

.character-card-header-cover-image::after {
    content: "";
    position: absolute;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
}

.character-card-header-upper,
.character-card-header-lower {
    position: relative;
    z-index: 1;
}

.character-card-header-upper {
    display: flex;
    align-items: center;
}

a {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}
.character-card-header-upper-details-link {
    position: absolute;
    inset: 0px;
    width: 100%;
}

.character-card-header-upper-portrait {
    flex: 0 0 auto;
}

.character-card-header-upper-portrait .image {
    border-radius: 3px;
    height: 60px;
    width: 60px;
    margin-right: 10px;
}

.character-card-header-upper-portrait .image.user-selected-avatar {
    background-position: center center;
    background-size: cover;
}

.character-card-header-upper-character-info {
    flex: 1 1 100%;
    min-width: 0px;
    padding-right: 10px;
}

.character-card-header-upper-character-info-primary,
.character-card-header-upper-character-info-secondary {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-wrap: normal;
    display: block;
}

.character-card-header-upper-character-info-primary {
    color: rgb(255, 255, 255);
    font-size: 22px;
}

.character-card-header-upper-character-info-primary,
.character-card-header-upper-character-info-secondary {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
}

.character-card-header-upper-character-info-secondary {
    color: rgb(189, 189, 189);
}

#site .character-card-footer-links-item {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
}

.character-card-footer {
    border-top: 1px solid rgb(222, 222, 222);
    padding: 0px 20px;
}

.character-card-footer-links {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

#site .character-card-footer-links-item-edit,
#site .character-card-footer-links-item-view,
#site .character-card-footer-links-item-claim,
#site .character-card-footer-links-item-more {
    display: flex;
    align-items: flex-start;
}

.character-card-wrapper {
    width: 33.3333%;
}

</style>
