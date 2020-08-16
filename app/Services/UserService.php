<?php
namespace App\Services;


class UserService
{
    protected $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    public function create(array $attributes)
    {
        $user = $this->user->newInstance();
        $user->fill($attributes);
        $user->save();

        return $user;
    }
}
