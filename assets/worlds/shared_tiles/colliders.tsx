<?xml version="1.0" encoding="UTF-8"?>
<tileset name="Colliders" tilewidth="16" tileheight="16">
 <image source="colliders.png" width="160" height="112"/>
 <tile id="0">
  <properties>
   <property name="collidable" value="true"/>
   <property name="type" value="solid"/>
  </properties>
 </tile>
 <tile id="1">
  <properties>
   <property name="collidable" value="true"/>
   <property name="half" value="yup"/>
   <property name="hitArea" value="[0,0,8,16]"/>
   <property name="type" value="solid"/>
  </properties>
 </tile>
 <tile id="2">
  <properties>
   <property name="collidable" value="true"/>
   <property name="hitArea" value="[8,0,8,16]"/>
   <property name="type" value="solid"/>
  </properties>
 </tile>
 <tile id="3">
  <properties>
   <property name="collidable" value="true"/>
   <property name="hitArea" value="[0,0,16,8]"/>
   <property name="type" value="solid"/>
  </properties>
 </tile>
 <tile id="4">
  <properties>
   <property name="collidable" value="true"/>
   <property name="hitArea" value="[0,8,16,8]"/>
   <property name="type" value="solid"/>
  </properties>
 </tile>
 <tile id="5">
  <properties>
   <property name="collidable" value="true"/>
   <property name="hitArea" value="[16,0,16,16,0,16]"/>
   <property name="type" value="solid"/>
  </properties>
 </tile>
 <tile id="6">
  <properties>
   <property name="collidable" value="true"/>
   <property name="hitArea" value="[0,0,16,16,0,16]"/>
   <property name="type" value="solid"/>
  </properties>
 </tile>
 <tile id="7">
  <properties>
   <property name="collidable" value="true"/>
   <property name="hitArea" value="[0,0,16,0,16,16]"/>
   <property name="type" value="solid"/>
  </properties>
 </tile>
 <tile id="8">
  <properties>
   <property name="collidable" value="true"/>
   <property name="hitArea" value="[0,0,16,0,0,16]"/>
   <property name="type" value="solid"/>
  </properties>
 </tile>
</tileset>