// pages/index.js
"use client"
import React, { useEffect } from 'react';

// Ensure Cesium is only imported in the client-side bundle
if (typeof window !== "undefined") {
  var Cesium = require('cesium/Cesium');
  require('cesium/Widgets/widgets.css');
}

const CesiumMap = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Cesium will be initialized here
      // Cesium.Ion.defaultAccessToken = 'your_access_token';

      const viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: Cesium.createWorldTerrain
      });

      // Add Cesium camera, entities, and so on...
    }
  }, []);

  return (
    <div>
      <div id="cesiumContainer" style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default CesiumMap;