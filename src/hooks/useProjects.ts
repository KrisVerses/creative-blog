import { useQuery } from "@tanstack/react-query";
import { allProjects } from "contentlayer/generated";
import { Project } from "contentlayer/generated";

const fetchProjects = async (): Promise<Project[]> => {
    const projects = await allProjects;
    return projects;
}

export const useProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });
}