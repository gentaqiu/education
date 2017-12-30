/usr/bin/node /opt/bitnami/apps/education/start.js

db.subject.update({"_id" :ObjectId("5a4775e340344c03c678a739") },{$set : {"lang":"zh"}})


db.subject.dropIndex({"v" : 2,"unique" : true,"key" : {"lang" : 1},"name" : "lang_1","ns" : "education.subject","background" : true})