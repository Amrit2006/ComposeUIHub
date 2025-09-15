import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertComponentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Components API routes
  
  // Get all components with optional category filter
  app.get("/api/components", async (req, res) => {
    try {
      const category = req.query.category as string;
      const components = await storage.getComponents(category);
      res.json(components);
    } catch (error) {
      console.error("Error fetching components:", error);
      res.status(500).json({ error: "Failed to fetch components" });
    }
  });

  // Search components
  app.get("/api/components/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
      const components = await storage.searchComponents(query);
      res.json(components);
    } catch (error) {
      console.error("Error searching components:", error);
      res.status(500).json({ error: "Failed to search components" });
    }
  });

  // Get single component by ID
  app.get("/api/components/:id", async (req, res) => {
    try {
      const component = await storage.getComponent(req.params.id);
      if (!component) {
        return res.status(404).json({ error: "Component not found" });
      }
      res.json(component);
    } catch (error) {
      console.error("Error fetching component:", error);
      res.status(500).json({ error: "Failed to fetch component" });
    }
  });

  // Create new component
  app.post("/api/components", async (req, res) => {
    try {
      const validatedData = insertComponentSchema.parse(req.body);
      const component = await storage.createComponent(validatedData);
      res.status(201).json(component);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid component data", 
          details: error.errors 
        });
      }
      console.error("Error creating component:", error);
      res.status(500).json({ error: "Failed to create component" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
