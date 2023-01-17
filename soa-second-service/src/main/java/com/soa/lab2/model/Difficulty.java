package com.soa.lab2.model;

import lombok.Getter;

@Getter
public enum Difficulty {
    VERY_EASY(0),
    NORMAL(1),
    VERY_HARD(2),
    IMPOSSIBLE(3),
    INSANE(4);

    private int level;

    Difficulty(int level) {
        this.level = level;
    }

    public static Difficulty getDifficultyByLevel(Integer level) {
        for (Difficulty d : values())
            if (d.getLevel() == level) return d;
        return null;
    }
}